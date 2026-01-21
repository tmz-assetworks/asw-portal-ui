import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsLoaderService {

  private isLoaded = false;
  private readonly apiKey: string = 'AIzaSyCX40o4SSWDp_a0DDw1u0OjdY-gLKjO18o';

  load(): Promise<void> {
    if (this.isLoaded) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      // Prevent loading the script twice
      if (document.getElementById('google-maps-script')) {
        this.isLoaded = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places&language=en`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.isLoaded = true;
        resolve();
      };

      script.onerror = () => {
        reject(new Error('Google Maps failed to load'));
      };

      document.head.appendChild(script);
    });
  }
}

