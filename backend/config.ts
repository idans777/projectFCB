class Config {
    public port = 3000;
    public mySqlHost = "localhost";
    public mySqlUser =  "root";
    public mySqlPassword =  "12345678";
    public mySqlName = "fcb_shop";
}

const config = new Config();
export default config;