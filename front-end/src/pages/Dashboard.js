import React from "react";

function Dashboard({
  date,
  reservations,
  reservationsError,
  tables,
  setTables,
  tablesError,
  loadDashboard,
}) {
  return (
    <>
      <div>dashboard</div>
      <div>
        <h2>res</h2>
        {reservations && (
          <div>
            {reservations.map((res) => {
              return (
                <div key={res.id}>
                  <h3>{res.firstName}</h3>
                  <div>
                    When: {res.date} at {res.time}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <h2>tables</h2>
        {tables && (
          <div>
            {tables.map((table) => {
              return (
                <div key={table.id}>
                  <h3>{table.name}</h3>
                  <div>capacity: {table.capacity}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
