export class SignUp {
    public Email: string = "";
    public Password: string = "";
    public FullName: string = "";
    public Address: string = "";

    isValid(): boolean {
        if (
            this.Address != "" ||
            this.Email != "" ||
            this.FullName != "" ||
            this.Password != "" 
          ) {
            return true;
        }
        else {
            return false;
        }
    }

    isEmail(): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.Email).toLowerCase());
    }

}
