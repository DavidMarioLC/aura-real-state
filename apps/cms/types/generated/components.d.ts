import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    description: '';
    displayName: 'Footer';
    icon: 'layout';
  };
  attributes: {
    columns: Schema.Attribute.Component<'layout.footer-column', true>;
    legal: Schema.Attribute.String;
    socials: Schema.Attribute.Component<'shared.social-link', true>;
    tagline: Schema.Attribute.Text;
  };
}

export interface LayoutFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_layout_footer_columns';
  info: {
    description: '';
    displayName: 'Footer Column';
    icon: 'layer';
  };
  attributes: {
    body: Schema.Attribute.Text;
    links: Schema.Attribute.Component<'shared.link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutNavItem extends Struct.ComponentSchema {
  collectionName: 'components_layout_nav_items';
  info: {
    description: '';
    displayName: 'Nav Item';
    icon: 'bulletList';
  };
  attributes: {
    children: Schema.Attribute.Component<'shared.link', true>;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutNavigation extends Struct.ComponentSchema {
  collectionName: 'components_layout_navigations';
  info: {
    description: '';
    displayName: 'Navigation';
    icon: 'apps';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.link', false>;
    items: Schema.Attribute.Component<'layout.nav-item', true>;
  };
}

export interface SectionsCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_ctas';
  info: {
    description: '';
    displayName: 'Cta';
    icon: 'message';
  };
  attributes: {
    link: Schema.Attribute.Component<'shared.link', false>;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    description: '';
    displayName: 'Hero';
    icon: 'picture';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.link', false>;
    eyebrow: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPhilosophy extends Struct.ComponentSchema {
  collectionName: 'components_sections_philosophies';
  info: {
    description: '';
    displayName: 'Philosophy';
    icon: 'book';
  };
  attributes: {
    body: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    link: Schema.Attribute.Component<'shared.link', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsSectionHeading extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_headings';
  info: {
    description: '';
    displayName: 'Section Heading';
    icon: 'apps';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    link: Schema.Attribute.Component<'shared.link', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsStat extends Struct.ComponentSchema {
  collectionName: 'components_sections_stats';
  info: {
    description: '';
    displayName: 'Stat';
    icon: 'chartPie';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedAmenity extends Struct.ComponentSchema {
  collectionName: 'components_shared_amenities';
  info: {
    description: '';
    displayName: 'Amenity';
    icon: 'star';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: '';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: '';
    displayName: 'Social Link';
    icon: 'earth';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    platform: Schema.Attribute.Enumeration<
      ['instagram', 'facebook', 'linkedin', 'youtube', 'whatsapp']
    > &
      Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'layout.footer': LayoutFooter;
      'layout.footer-column': LayoutFooterColumn;
      'layout.nav-item': LayoutNavItem;
      'layout.navigation': LayoutNavigation;
      'sections.cta': SectionsCta;
      'sections.hero': SectionsHero;
      'sections.philosophy': SectionsPhilosophy;
      'sections.section-heading': SectionsSectionHeading;
      'sections.stat': SectionsStat;
      'shared.amenity': SharedAmenity;
      'shared.link': SharedLink;
      'shared.social-link': SharedSocialLink;
    }
  }
}
