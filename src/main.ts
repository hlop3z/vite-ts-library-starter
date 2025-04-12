import { stepFlow } from "./lib/utils";
import Schema from "./lib/schema";

const initialSteps = {
  1: (data: any) => {
    data.step1 = "Initialized";
    console.log("Step 1: Initialize");
    return data; // Synchronous step
  },
  2: async (data: any) => {
    data.step2 = "Data Loaded";
    console.log("Step 2: Load data (async)");
    return new Promise((resolve) => setTimeout(() => resolve(data), 1000)); // Simulate async delay
  },
  3: (data: any) => {
    data.step3 = "Data Processed";
    console.log("Step 3: Process data");
    return data; // Synchronous step
  },
  4: async (data: any) => {
    data.step4 = "Finalized";
    console.log("Step 4: Finalize (async)");
    return new Promise((resolve) => setTimeout(() => resolve(data), 500)); // Simulate async delay
  },
};

const flow = stepFlow(initialSteps);

// Flow
flow
  .run({}) // Initial empty data
  .then((finalData) => {
    console.log(finalData);
  });

// Schema
console.log(Schema);

// Export
export default { stepFlow };
