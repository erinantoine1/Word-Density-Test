# Word-Density-Test
An app that calculates the top 20 most dense words on the page from any URL.

Installation: 
1. Copy project repo to your local machine.
    git clone https://github.com/erinantoine1/Word-Density-Test.git
2. Change to the project directory.
    cd 'Word-Density-Test'
3. Install dependencies.
    npm install
4. Open another terminal. Log into MySQL (Replace username and password with your actual credentials).
    mysql -u username -p password
5. Execute the schema file (Replace schema.sql with the full path for this file in the Word-Density-Test project. The file path for the current project can be determined by typing 'pwd' in your first terminal. Add '/database/index.sql' to the end of the file path and execute the command as shown below in the MySQL terminal).
    source file_Path/database/index.sql;
6. Update environmental variables (update your MySQL username and password in this file, if different from current).
    nano .env (use ^O to save changes/ ^X to exit nano)
7. Run the project on localhost.
    npm start
   
The project should now be available for viewing at http://localhost:3000/
