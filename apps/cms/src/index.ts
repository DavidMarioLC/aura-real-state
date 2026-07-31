import type { Core } from '@strapi/strapi';

/**
 * Los locales viven en DB, no en el repo, así que se aseguran en cada arranque
 * para que todos los ambientes queden con la misma configuración.
 */
const DEFAULT_LOCALE_CODE = 'en';

const LOCALES = [
  { code: 'en', name: 'English (en)' },
  { code: 'es', name: 'Spanish (es)' },
];

const ensureLocales = async (strapi: Core.Strapi) => {
  const locales = strapi.plugin('i18n').service('locales');

  for (const locale of LOCALES) {
    if (await locales.findByCode(locale.code)) continue;

    await locales.create(locale);
    strapi.log.info(`[i18n] locale creado: ${locale.code}`);
  }

  if ((await locales.getDefaultLocale()) !== DEFAULT_LOCALE_CODE) {
    await locales.setDefaultLocale({ code: DEFAULT_LOCALE_CODE });
    strapi.log.info(`[i18n] default locale: ${DEFAULT_LOCALE_CODE}`);
  }
};

/**
 * Acciones de la API que `apps/web` consume sin autenticación. Los permisos
 * también viven en DB, así que se aseguran igual que los locales.
 */
const PUBLIC_ACTIONS = [
  'api::property.property.find',
  'api::property.property.findOne',
  'api::agent.agent.find',
  'api::agent.agent.findOne',
  'api::home-page.home-page.find',
];

const ensurePublicPermissions = async (strapi: Core.Strapi) => {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    strapi.log.warn('[permissions] no existe el rol public, se omite');
    return;
  }

  for (const action of PUBLIC_ACTIONS) {
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: publicRole.id } });

    if (existing) continue;

    await strapi.db
      .query('plugin::users-permissions.permission')
      .create({ data: { action, role: publicRole.id } });
    strapi.log.info(`[permissions] public: ${action}`);
  }
};

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensureLocales(strapi);
    await ensurePublicPermissions(strapi);
  },
};
