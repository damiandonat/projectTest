# This is a test project for the exercices.
1. You must have installed nodejs in your system.
2. You must have installed docker in your system.
3. Run command npm install.
4. Run the command "docker-compose up".
5. Run the command "docker-compose start".
6. Open your terminal, and execute command DEBUG=* nodemon server.js
7. I recommend have installed postman in your system. If not have this program, use other program.
8. The host is http://localhost:9000.
9. You use the /api/plan via POSTfor get all plans.
10. You use the /api/plan via POST and put param { id: String<idPlan> } for get one plan.
11. You use the /api/budget from view list of phones that the customer wants to buy. This api is via POST and send params:
  {
    name: String<idPlan>
    surname: String<idPlan>
    email: String<idPlan>
    idPhone: Array<idPlan>
  }
