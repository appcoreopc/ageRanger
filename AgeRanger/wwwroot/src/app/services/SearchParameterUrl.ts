export class URLSearchParams {

    parseUrl: string;
    isQuestionMarkParsed: boolean = false;
    paramIdx: number = 0;

    getSearchParameter(firstname: string, lastname: string) {
        this.setFirstName(firstname);
        this.setLastName(lastname);
        return this.ParseUrl;
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
            this.parseUrl = "?";
            this.isQuestionMarkParsed = true;
        }
    }

    private ParseUrl(param: string) {
        if (this.paramIdx > 0) {
            this.parseUrl = param;
        }
        this.paramIdx++;
    }
}
