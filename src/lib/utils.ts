export function stepFlow(steps = {}) {
  const handlers = Object.entries(steps).map(([number, fn]) => ({
    number: Number(number),
    fn,
  }));

  return {
    addStep(number: number, fn: any) {
      handlers.push({ number, fn });
      return this; // Enable chaining
    },
    async run(initialData: any) {
      // Sort steps by their number
      handlers.sort((a, b) => a.number - b.number);

      // Pass the initial data into each step and let them mutate it
      let data = { ...initialData }; // Copy initial data to avoid mutation issues

      for (const { fn } of handlers) {
        // Wait for the step to resolve if it's a promise (async)
        data = await (fn as (data: any) => Promise<any>)(data); // Pass data and update it with the function's return
      }

      return data; // Return the final modified data after all steps
    },
  };
}
