import { useState } from "react";
import Editor from "./components/Editor";
import DesignList from "./components/DesignList";

function App() {
  const [currentDesignId, setCurrentDesignId] = useState<string | null>(null);

  if (currentDesignId) {
    return <Editor designId={currentDesignId} onClose={() => setCurrentDesignId(null)} />;
  }

  return <DesignList onSelectDesign={setCurrentDesignId} />;
}

export default App;
