const {
	Worker,
	isMainThread,
	parentPort,
	workerData
  } = require("worker_threads");
  
  const task = require("./worker");
  
  const worker = color => {
	let w = new Worker(__filename, { workerData: color });
	w.on("message", msg => {
	  console.log(`worker time: ${msg.time}`);
	});
	w.on("error", console.error);
	w.on("exit", code => {
	  if (code != 0)
		console.error(new Error(`Worker stopped with exit code ${code}`));
	});
  };
  
  if (isMainThread) {
	console.log("main thread");
	["red", "green", "yellow", "blue"].map(worker);
  } else {
	const time = task(workerData);
	parentPort.postMessage({ time });
  }