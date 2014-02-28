var db = application.get('database');
if (db == null) {
    db = new Database("jdbc:mysql://localhost:3306/wso2_con_api", "wso2conuser", "4./NsM8hKusU2");
    application.put('database', db);
}