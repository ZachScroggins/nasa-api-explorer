// Images

export type ImagesData =
  | {
      collection: {
        href: string;
        items: ImageDataItem[];
        links: {
          href: string;
          prompt: string;
          rel: string;
        }[];
        metadata: {
          total_hits: number;
        };
        version: string;
      };
    }
  | undefined;

export type ImageItemData =
  | {
      href: string;
      images: {
        href: string;
        items: {
          href: string;
        }[];
        version: string;
      };
      items: ImageDataItem[];
      metadata: {
        total_hits: number;
      };
      version: string;
    }
  | undefined;

export interface ImageDataItem {
  data: {
    center: string;
    date_created: string;
    description: string;
    description_500: string;
    keywords: string[];
    media_type: string;
    nasa_id: string;
    secondary_creator: string;
    title: string;
  }[];
  href: string;
  links: { href: string; rel: string; render: string }[];
}

// EPIC

export type EpicData =
  | {
      type: 'natural' | 'enhanced';
      items: EpicDataItem[];
    }
  | undefined;

export interface EpicDataItem {
  identifier: string;
  caption: string;
  image: string;
  version: string;
  centroid_coordinates: CentroidCoordinates;
  dscovr_j2000_position: J2000Position;
  lunar_j2000_position: J2000Position;
  sun_j2000_position: J2000Position;
  attitude_quaternions: AttitudeQuaternions;
  date: string;
  coords: Coords;
}

interface AttitudeQuaternions {
  q0: number;
  q1: number;
  q2: number;
  q3: number;
}

interface CentroidCoordinates {
  lat: number;
  lon: number;
}

interface Coords {
  centroid_coordinates: CentroidCoordinates;
  dscovr_j2000_position: J2000Position;
  lunar_j2000_position: J2000Position;
  sun_j2000_position: J2000Position;
  attitude_quaternions: AttitudeQuaternions;
}

export interface J2000Position {
  x: number;
  y: number;
  z: number;
}

// APOD

export type ApodData =
  | {
      date: string;
      explanation: string;
      hdurl: string;
      media_type: string;
      service_version: string;
      title: string;
      url: string;
      copyright?: string;
    }
  | undefined;
