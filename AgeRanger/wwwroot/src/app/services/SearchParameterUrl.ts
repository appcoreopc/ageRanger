export class URLSearchParams {
    
    private searchUrl: string;
    private isQuestionMarkParsed: boolean = false;
    private paramIdx: number = 0;

     private readonly firstNameSearchKey = "firstname=";
     private readonly lastNameSearchKey = "lastname=";
     private readonly queryMarker = "?";
     private readonly nextQueryMarker = "&";

    getSearchParameter(firstname: string, lastname: string): string {
        this.setFirstName(firstname);
        this.setLastName(lastname);
        return this.searchUrl;
    }

    private setFirstName(firstname: string) {
        this.setQuestionMark();
        if (firstname) {
            this.ParseUrl(this.firstNameSearchKey + firstname);
        }
    }

    private setLastName(lastname: string) {
        this.setQuestionMark();
        if (lastname)
            this.ParseUrl(this.lastNameSearchKey + lastname);
    }

    private setQuestionMark() {

        if (!this.isQuestionMarkParsed) {
            this.searchUrl = this.queryMarker;
            this.isQuestionMarkParsed = true;
            this.paramIdx++;
        }
    }

    private ParseUrl(param: string) {
        if (this.paramIdx == 1) {
            this.searchUrl = this.searchUrl + param;
        }
        else if (this.paramIdx > 1) {
            this.searchUrl = this.searchUrl + this.nextQueryMarker + param;
        }
        this.paramIdx++;
    }
}
