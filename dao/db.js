var db = application.get('database');
if (db == null) {
    db = new Database("jdbc:mysql://localhost:3306/wso2_con_api", "root", "root");
    application.put('database', db);
}