"use client";
import React, { useState, useEffect } from "react";

import UserTable from "./(components)/userTable";
import FilterDialog from "./(components)/FilterDialog";
import { validate } from "./(utils)/functions";
import { SCHEMA } from "./(utils)/constants";
import {
  getDb,
  insertDummyDataIfNeeded,
  getAllPatientDetails,
  executeQuery,
} from "./(db)/db";
import Loader from "./(components)/loader";
import { ErrorModal } from "./(components)/errorModal";
import QueryPreviewModal from "./(components)/queryModal";

const App = () => {
  const [filterClicked, setFilterClicked] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const [query, setQuery] = useState("");
  const [queryClicked, setQueryClicked] = useState(false);
  const [queryInternal, setQueryInternal] = useState("");
  const onApply = async (query: string) => {
    setIsLoading(true);
    

    const isValid = validate(query);
    if (isValid) {
      
      setQuery(query);
      const res=await executeQuery(query, [], setData, setHeaders, setErrorMessage)
      if(res){
        setFilterClicked(!res)
        setIsLoading(false);
        return
      }
       // Pass setModalError to handle errors
    }
    setQuery("")
  
    setIsLoading(false);
  };
  const fetchAll = async () => {
    const result = await getAllPatientDetails();

    if (result.rows && result.rows.length > 0) {
      setData(result.rows);
      
      // Dynamically extract headers from keys
      const keys = Object.keys(result.rows[0]);
      setHeaders(keys);
    }
  };
  useEffect(() => {
    if (query === "") {
      fetchAll();
    }
  }, [query]);
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      await getDb();
      console.log("Successfully initialized database");
      await insertDummyDataIfNeeded();

      const result = await getAllPatientDetails();

      if (result.rows && result.rows.length > 0) {
        setData(result.rows);
        // Dynamically extract headers from keys
        const keys = Object.keys(result.rows[0]);
        setHeaders(keys);
      }
      setIsLoading(false);
    }

    init();
  }, []);

  

  return isLoading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Loader />
    </div>
  ) : (
    <div className="relative">
      <div className="px-8 py-6 bg-white border border-gray-200 rounded-2xl shadow-sm m-6">
        <h1 className="text-2xl font-semibold text-gray-600">Listing Page</h1>
      </div>

      <UserTable
        headers={headers}
        data={data}
        setFilterClicked={setFilterClicked}
        enableFilter={true}
        setShowQueryClicked={setQueryClicked}
      />

      <FilterDialog
        open={filterClicked}
        onClose={() => setFilterClicked(false)}
        schema={SCHEMA}
        query={queryInternal}
        setQuery={setQueryInternal}
        onApply={onApply}
      />
      <QueryPreviewModal
        open={queryClicked}
        onClose={() => setQueryClicked(false)}
        sql={query}
        onReset={()=>{setQuery("")}}
      />

      {/* Display Error Modal if there is an error */}
      {errorMessage && (
        <ErrorModal
          errorMessage={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
    </div>
  );
};

export default App;
