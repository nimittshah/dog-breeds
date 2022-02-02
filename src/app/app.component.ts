import { Component, OnInit } from '@angular/core';
import { DogServiceService } from './_services/dog-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  breedList = [];
  selectedBreed: any = "";
  selectedSubBreed: any = "";
  selectedImage: any;
  errorMessage: string = "";

  constructor(private dogService: DogServiceService) { }

  ngOnInit() {
    this.dogService.fetchDogs().subscribe(_breeds => {
      this.breedList = _breeds;
    })
  }
  /** onBreedChange : this function selects the first SubBreed if selected breed have any */
  onBreedChange(_breed: any) {
    this.resetError();
    this.selectedSubBreed = _breed.value[0];
  }

  /** getImage : this function will fetch the image of selected breed + sub-breed dog */
  getImage() {
    this.resetError();
    if (this.selectedBreed.key && this.selectedSubBreed) {
      this.dogService.fetchDogImage(this.selectedBreed.key, this.selectedSubBreed).subscribe(_breedImage => {
        this.selectedImage = _breedImage;
      },
        error => {
          console.log("rror");
          this.errorMessage = error;
        })
    } else {
      this.errorMessage = "Breed and Sub-Breed is mendatory";
    }
  }

  /** resetError : reset all the error variables */
  resetError() {
    this.errorMessage = "";
  }
}
