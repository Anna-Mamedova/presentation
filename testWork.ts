const truncateTheFractionalPart = (obj) => {
  var result = Object.assign({}, obj);
  for (var key in result) {
    result[key] = parseInt(result[key]);
  }
  return result;
};

function calculateTeamFinanceReport(salaries, team) {
  const report = {
    totalBudgetTeam: 0,
  };

  team.forEach((element) => {
    const salaryElement = salaries[element.specialization];
    if (salaryElement) {
      const fieldName = `totalBudget${element.specialization}`;
      const salaryCount =
        salaryElement.salary / ((100 - parseInt(salaryElement.tax)) / 100);
      report[fieldName] = report[fieldName]
        ? report[fieldName] + salaryCount
        : salaryCount;
      report.totalBudgetTeam += salaryCount;
    }
  });

  return truncateTheFractionalPart(report);
}
const salaries1 = {
  Manager: { salary: 1000, tax: "10%" },
  Designer: { salary: 600, tax: "30%" },
  Artist: { salary: 1500, tax: "15%" },
};
const team1 = [
  { name: "Misha", specialization: "Manager" },
  { name: "Max", specialization: "Designer" },
  { name: "Vova", specialization: "Designer" },
  { name: "Leo", specialization: "Artist" },
];
const financeReport1 = calculateTeamFinanceReport(salaries1, team1);
console.log(JSON.stringify(financeReport1));
/* see in console
{
"totalBudgetTeam":4590, // total budget does not match the sum of specializations due
to truncation of the fractional part
"totalBudgetManager":1111,
"totalBudgetDesigner":1714,
"totalBudgetArtist":1764,
}
*/

const salaries2 = {
  TeamLead: { salary: 1000, tax: "99%" },
  Architect: { salary: 9000, tax: "34%" },
};
const team2 = [
  { name: "Alexander", specialization: "TeamLead" },
  { name: "Gaudi", specialization: "Architect" },
  { name: "Koolhas", specialization: "Architect" },
  { name: "Foster", specialization: "Architect" },
  { name: "Napoleon", specialization: "General" },
];
const financeReport2 = calculateTeamFinanceReport(salaries2, team2);
console.log(JSON.stringify(financeReport2));
// see in console
// {"totalBudgetTeam":140909,"totalBudgetTeamLead":100000,"totalBudgetArchitect":40909}
