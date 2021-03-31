import { J2000Position } from 'types';

// Calculus/Trig - Angle between 3d vectors - sun/moon earth vehicle angle
export const getAngleBetweenVectors = (
  body: J2000Position,
  dscovr: J2000Position
): number => {
  const dotProduct: number =
    body.x * dscovr.x + body.y * dscovr.y + body.z * dscovr.z;
  const magnitudeA: number = Math.sqrt(
    Math.pow(body.x, 2) + Math.pow(body.y, 2) + Math.pow(body.z, 2)
  );
  const magnitudeB: number = Math.sqrt(
    Math.pow(dscovr.x, 2) + Math.pow(dscovr.y, 2) + Math.pow(dscovr.z, 2)
  );
  const cosAngle: number = dotProduct / (magnitudeA * magnitudeB);
  const angle: number = Math.acos(cosAngle) * (180 / Math.PI);
  return angle;
};

// Calculus vector magnitude/distance = sqrt(x^2 + y^2 + z^2)
export const getDistance = (x: number, y: number, z: number): number => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
};

// Trig - Law of cosines - c = sqrt(a^2 + b^2 - 2ab * cos(y))
export const lawOfCosines = (
  distance1: number,
  distance2: number,
  angle: number
): number => {
  const result: number = Math.sqrt(
    Math.pow(distance1, 2) +
      Math.pow(distance2, 2) -
      2 * distance1 * distance2 * Math.cos(angle * (Math.PI / 180))
  );
  return result;
};
