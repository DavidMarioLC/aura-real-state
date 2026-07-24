import type { Schema, Struct } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.amenity': SharedAmenity;
    }
  }
}
