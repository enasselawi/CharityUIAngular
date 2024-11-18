import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-getcharities',
  templateUrl: './getcharities.component.html',
  styleUrls: ['./getcharities.component.css']
})
export class GetcharitiesComponent implements OnInit {
  private map: L.Map | undefined;

  // Custom marker icon for a larger size
  private customIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // Default marker icon URL
    iconSize: [32, 48], // Adjust size (width, height)
    iconAnchor: [16, 48], // Anchor point of the icon
    popupAnchor: [0, -48], // Position of the popup relative to the icon
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeMap();
    this.loadMarkersFromApi();
  }

  private initializeMap(): void {
    const mapContainer = document.getElementById('jordanMap');
    if (!mapContainer) {
      console.error('Map container not found!');
      return;
    }
  
    this.map = L.map(mapContainer, {
      center: [31.963158, 35.930359],
      zoom: 6,
    });
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  
    console.log('Map initialized:', this.map);
  }
  
  

  private loadMarkersFromApi(): void {
    this.http
      .get<any[]>('https://localhost:7127/api/Charity/GetAllCharities') // Replace with your actual API endpoint
      .subscribe(
        (locations) => {
          console.log('Locations:', locations);

          const markers: L.LatLng[] = [];

          locations.forEach((location) => {
            if (location.location && location.location.includes(',')) {
              const [lat, lng] = location.location
                .split(',')
                .map((coord: string) => parseFloat(coord.trim())); // Parse lat/lng

              if (!isNaN(lat) && !isNaN(lng)) {
                console.log(`Adding marker at: Latitude: ${lat}, Longitude: ${lng}`);

                markers.push(L.latLng(lat, lng)); // Add the marker coordinates to the list

                if (this.map) {
                  L.marker([lat, lng], { icon: this.customIcon }) // Use the custom icon
                    .addTo(this.map)
                    .bindPopup(
                      `<b>${location.charityname}</b><br>${location.charitydescription}` // Popup content
                    );
                }
              } else {
                console.warn(`Invalid coordinates for location: ${location.location}`);
              }
            } else {
              console.warn(`Skipping invalid location: ${location.location}`);
            }
          });

          // Adjust the map view to fit all markers
          if (this.map && markers.length > 0) {
            const bounds = L.latLngBounds(markers);
            this.map.fitBounds(bounds);
          }
        },
        (error) => {
          console.error('Error loading locations:', error); // Handle API call errors
        }
      );
  }
}
