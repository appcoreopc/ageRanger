import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {
    isLoading: boolean = false;

    setIsLoading() {
        this.isLoading = true;
    }

    setNotLoading() {
        this.isLoading = false;
    }
}