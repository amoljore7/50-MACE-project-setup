import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { latLngForPatientAddress, nearByResource } from '../saga';

const containerStyle = {
  width: '100%',
  height: '100%'
};
const getLinkCenter = (sts: string, spin: number, clr: string) => {
  const imgLink = {
    url: `https://chart.googleapis.com/chart?chst=d_map_spin&chld=1.1|${0}|${clr}|16|b|${sts}`
  };
  return imgLink.url;
};
const getLink = (sts: string, cnt: number, spin: number, clr: string) => {
  const imgLink = {
    url: `https://chart.googleapis.com/chart?chst=d_map_spin&chld=1.1|${0}|${clr}|16|b|${
      sts + (cnt > 1 ? cnt : '')
    }`
  };
  return imgLink.url;
};
interface GoogleMapsComponentProps {
  nearByResources?: nearByResource[];
  latLngForPatientAddress: latLngForPatientAddress;
}

export type Props = GoogleMapsComponentProps;

const GoogleMapsComponent: React.FC<Props> = (props: Props) => {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: +props.latLngForPatientAddress.lat || 41.881832,
        lng: +props.latLngForPatientAddress.lng || -87.623177
      }}
      zoom={14}>
      {props.latLngForPatientAddress != null && (
        <Marker
          icon={getLinkCenter('C', 90, 'bada55')}
          animation={1}
          position={{
            lat: +props.latLngForPatientAddress.lat,
            lng: +props.latLngForPatientAddress.lng
          }}
          title={props.latLngForPatientAddress ? props.latLngForPatientAddress.address : ''}
        />
      )}

      {props.nearByResources &&
        props.nearByResources != null &&
        props.nearByResources.length &&
        props.nearByResources.map((resource: nearByResource, index: number) => (
          <Marker
            key={index}
            icon={getLink('L', 0, 90, 'FF7F50')}
            animation={google.maps.Animation.DROP}
            position={{ lat: +resource.lat, lng: +resource.lng }}
            title={resource.name || ''}
          />
        ))}
    </GoogleMap>
  );
};

export default GoogleMapsComponent;
