var mainWorld = (function() {
  "use strict";
  function defineUnlistedScript(arg) {
    if (arg == null || typeof arg === "function") return { main: arg };
    return arg;
  }
  const definition = defineUnlistedScript(() => {
    let _lastId = 0;
    function getId() {
      _lastId += 1;
      return _lastId;
    }
    const execute = async (task, config) => {
      if (typeof task !== "string") throw new Error("Task must be a string");
      if (task.trim().length === 0) throw new Error("Task cannot be empty");
      if (!config) throw new Error("Config is required");
      if (!config.baseURL) throw new Error("Config must have a baseURL");
      if (!config.apiKey) throw new Error("Config must have an apiKey");
      if (!config.model) throw new Error("Config must have a model");
      const id = getId();
      const promise = new Promise((resolve, reject) => {
        function handleMessage(e) {
          if (e.origin !== window.location.origin) return;
          const data = e.data;
          if (typeof data !== "object" || data === null) return;
          if (data.channel !== "PAGE_AGENT_EXT_RESPONSE") return;
          if (data.id !== id) return;
          if (data.action === "status_change_event" && config.onStatusChange) {
            config.onStatusChange(data.payload);
            return;
          }
          if (data.action === "activity_event" && config.onActivity) {
            config.onActivity(data.payload);
            return;
          }
          if (data.action === "history_change_event" && config.onHistoryUpdate) {
            config.onHistoryUpdate(data.payload);
            return;
          }
          if (data.action !== "execute_result") return;
          window.removeEventListener("message", handleMessage);
          if (data.error) {
            reject(new Error(data.error));
          } else {
            resolve(data.payload);
          }
        }
        window.addEventListener("message", handleMessage);
      });
      window.postMessage(
        {
          channel: "PAGE_AGENT_EXT_REQUEST",
          id,
          action: "execute",
          payload: {
            task,
            config: {
              baseURL: config.baseURL,
              apiKey: config.apiKey,
              model: config.model,
              includeInitialTab: config.includeInitialTab
            }
          }
        },
        "*"
      );
      return promise;
    };
    const stop = () => {
      const id = getId();
      window.postMessage(
        {
          channel: "PAGE_AGENT_EXT_REQUEST",
          id,
          action: "stop"
        },
        "*"
      );
    };
    window.PAGE_AGENT_EXT_VERSION = "1.5.7";
    window.PAGE_AGENT_EXT = {
      version: "1.5.7",
      execute,
      stop
    };
  });
  function initPlugins() {
  }
  function print(method, ...args) {
    return;
  }
  const logger = {
    debug: (...args) => print(console.debug, ...args),
    log: (...args) => print(console.log, ...args),
    warn: (...args) => print(console.warn, ...args),
    error: (...args) => print(console.error, ...args)
  };
  const result = (() => {
    try {
      initPlugins();
    } catch (err) {
      logger.error(`Failed to initialize plugins for "${"main-world"}"`, err);
      throw err;
    }
    let result2;
    try {
      result2 = definition.main();
      if (result2 instanceof Promise) result2 = result2.catch((err) => {
        logger.error(`The unlisted script "${"main-world"}" crashed on startup!`, err);
        throw err;
      });
    } catch (err) {
      logger.error(`The unlisted script "${"main-world"}" crashed on startup!`, err);
      throw err;
    }
    return result2;
  })();
  return result;
})();
mainWorld;
