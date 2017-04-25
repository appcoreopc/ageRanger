export class URLSearchParams {
    searchUrl: string;
    isQuestionMarkParsed: boolean = false;
    paramIdx: number = 0;

    getSearchParameter(firstname: string, lastname: string): string {
        this.setFirstName(firstname);
        this.setLastName(lastname);
        return this.searchUrl;
    }

    private setFirstName(firstname: string) {
        this.setQuestionMark();
        if (firstname) {
            this.ParseUrl("firstname=" + firstname);
        }
    }

    private setLastName(lastname: string) {
        this.setQuestionMark();
        if (lastname)
            this.ParseUrl("lastname=" + lastname);
    }

    private setQuestionMark() {

        if (!this.isQuestionMarkParsed) {
            this.searchUrl = "?";
            this.isQuestionMarkParsed = true;
            this.paramIdx++;
        }
    }

    private ParseUrl(param: string) {
        if (this.paramIdx == 1) {
            this.searchUrl = this.searchUrl + param;
        }
        else if (this.paramIdx > 1) {
            this.searchUrl = this.searchUrl + "&" + param;
        }
        this.paramIdx++;
    }
}
