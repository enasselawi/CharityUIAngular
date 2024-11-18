import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { CharityService } from '../Services/charity.service';

@Component({
  selector: 'app-addcharity',
  templateUrl: './addcharity.component.html',
  styleUrls: ['./addcharity.component.css'],
})
export class AddcharityComponent implements OnInit {
  charityForm: FormGroup;
  charityCategories: any[] = []; // Add a property to store charity categories
  private map: L.Map | undefined;
  private marker: L.Marker | undefined;

  constructor(private fb: FormBuilder, private charityService: CharityService) {
    this.charityForm = this.fb.group({
      charityName: ['', Validators.required],
      charityDesc: ['', Validators.required],
      mission: ['', Validators.required],
      goals: ['', Validators.required],
      location: ['', Validators.required],
      charityCategory: ['', Validators.required], // Add control for charity category
    });
  }

  ngOnInit(): void {
    this.getCharityCategories();

    const jordanBounds = L.latLngBounds(
      L.latLng(29.1855, 34.9599), // Southwest corner
      L.latLng(33.3736, 39.3012) // Northeast corner
    );

    this.map = L.map('map', {
      center: [31.963158, 35.930359], // Center on Amman, Jordan
      zoom: 7,
      maxBounds: jordanBounds,
      maxBoundsViscosity: 1.0,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (!this.map) return;

      const { lat, lng } = e.latlng;

      this.charityForm.patchValue({
        location: `${lat}, ${lng}`,
      });

      if (this.marker) this.marker.remove();

      this.marker = L.marker([lat, lng]).addTo(this.map);
    });

    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 100);

    window.addEventListener('resize', () => {
      if (this.map) this.map.invalidateSize();
    });
  }

  getCharityCategories(): void {
    this.charityService.getCharityCategories().subscribe(
      (categories) => {
        this.charityCategories = categories;
      },
      (error) => {
        console.error('Error fetching charity categories', error);
      }
    );
  }

  onSubmit() {
    if (this.charityForm.valid) {
      const charityData = {
        charityname: this.charityForm.value.charityName,
        charitydescription: this.charityForm.value.charityDesc,
        mission: this.charityForm.value.mission,
        goals: this.charityForm.value.goals,
        location: this.charityForm.value.location,
        status: 'pending',
        userid: parseInt(localStorage.getItem('userId') || '0', 10),
        charitycategoryid: this.charityForm.value.charityCategory,
      };
      debugger;
      this.charityService.addCharity(charityData).subscribe(
        (response) => {
          console.log('Charity added successfully', response);
        },
        (error) => {
          console.error('Error adding charity', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
          
