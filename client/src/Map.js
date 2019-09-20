import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
};

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state =
    {
      currentLocation:
      {
        lat: lat,
        lng: lng
      }
    };

    setInterval(() =>
    {
      let lat = this.state.currentLocation.lat;
      let lng = this.state.currentLocation.lng;
      lat += 0.00001;
      lng += 0.00001;
      this.setState({ "currentLocation" : {
        "lat": lat,
        "lng": lng
      } })   
    }, 1000)
  }

  componentDidUpdate(prevProps, prevState) {
      if (prevProps.google !== this.props.google) {
        this.loadMap();
      }
      if (prevState.currentLocation !== this.state.currentLocation) {
        this.recenterMap();
      }
    }

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }

  recenterMap() {
      const map = this.map;
      const current = this.state.currentLocation;

      const google = this.props.google;
      const maps = google.maps;

      if (map) {
        let center = new maps.LatLng(current.lat, current.lng);
        map.panTo(center);
      }
    }

    componentDidMount()
    { 
      this.loadMap();
    }

     loadMap()
     {
        if (this.props && this.props.google)
        {
          // checks if google is available
          const { google } = this.props;
          const maps = google.maps;

          const mapRef = this.refs.map;

          // reference to the actual DOM element
          const node = ReactDOM.findDOMNode(mapRef);

          let { zoom } = this.props;
          const { lat, lng } = this.state.currentLocation;
          const center = new maps.LatLng(lat, lng);
          const mapConfig = Object.assign(
            {},
            {
              center: center,
              zoom: 18
            }
          );

          // maps.Map() is constructor that instantiates the map
          this.map = new maps.Map(node, mapConfig);
        }
      }

       renderChildren() {
          const { children } = this.props;

          if (!children) return;

          return React.Children.map(children, c => {
            if (!c) return;
            return React.cloneElement(c, {
              map: this.map,
              google: this.props.google,
              mapCenter: this.state.currentLocation
            });
          });
        }

        render() {
             const style = Object.assign({}, mapStyles.map);
            return (
              <div>
                <Marker onClick={this.onMarkerClick} name={'current location'} />
                <div style={style} ref="map">
                  Loading map...
                </div>
                {this.renderChildren()}
              </div>
            );
          }
}


export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: -1.2884,
    lng: 36.8233
  },
  centerAroundCurrentLocation: true,
  visible: true
};
