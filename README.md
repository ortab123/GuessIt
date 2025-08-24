# GuessIt — Dog, Cat and general knowledge Quiz for Kids

A React + Vite app where Parents create accounts and add children. Kids play a dog‑breed quiz sourced live from TheDogAPI or cat‑breed quiz sourced live from TheCatAPI or a general knowledge quiz that the parent creates based on topics and images of their choice and saves them to a database.
Each answer updates per‑child stats (correct/wrong, minutes played) and maintains a list of ‘difficult breeds’ the child got wrong, which the parent sees in a dashboard with charts.



✨ Features

* Auth : parent signup/login/logout

* Who’s Playing?: Parent + Child screen (children appear after you add them)

* Add Child: name & age → stored under the logged‑in parent

* Child Dashboard- Quiz:

    1. A question and four pictures to choose the correct answer
    
    2. Records stats per child: correct, wrong, total minutes played, difficult breeds)

* Parent Dashboard: 

    1. list of his chidren and optioin to delete user
    
    2. add a general knowledge quiz
    
    3. Statistics, summary and charts of the children (correct vs wrong, accuracy, minutes played, difficult breeds)




▶️ Run Locally
1) Clone the project


2) Install dependencies
Make sure you have Node.js (v18+) installed and then run npm install


3) Configure environment variables
Create a file called .env in the root of the project and set:

          Supabase
          VITE_SUPABASE_URL=https://<your-project>.supabase.co
          VITE_SUPABASE_ANON_KEY=<your-anon-key>
          
          Dog API
          VITE_DOG_API_KEY=<your-dog-api-key>


4) Start development server
npm run dev

