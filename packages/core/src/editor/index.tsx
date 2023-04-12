import React, {Dispatch, SetStateAction, useState} from 'react';
import {Allotment} from "allotment";

import {ModelInfoType} from '../types/monaco';
import FileNavBar from "../components/FileNavBar";
import Console from "../components/Console";
import DeployAndCall from "../components/DeployAndCall";
import CssWrapper from "../components/CssWrapper";

import {EditorProvider} from './contexts/editorContext';
import MonacoEditor from './monacoEditor';
import {ConsoleProvider} from "./contexts/consoleContext";
import {DeployedProvider} from "./contexts/deployedContext";
import {RelayNetworkProvider} from "./contexts/relayNetworkContext";

export type TConsoleProps = {
  defaultVisible?: boolean;
  defaultHeight?: string;
  minHeight?: number;
}

export type TDeployProps = {
  defaultVisible?: boolean;
  defaultWidth?: string;
  minWidth?: number;
  maxWidth?: number;
}

export type TEditorProps = {
  id: string;
  modelInfos: ModelInfoType[];
  height: string;
  console?: TConsoleProps;
  deploy?: TDeployProps;
  onSuccess?: Dispatch<SetStateAction<number>>;
  onFailure?: () => void;
  onCompile?: () => void;
  submissionCount?: number;
  children?: any;
};

const Main = (props: TEditorProps) => {
  const {height, console = {}, deploy = {}, modelInfos} = props;
  const [consoleVisible, setConsoleVisible] = useState<boolean>(console.defaultVisible === undefined ? true : console.defaultVisible);
  const [deployVisible, setDeployVisible] = useState<boolean>(deploy.defaultVisible === undefined ? true : deploy.defaultVisible);

  const handleDeployContainerVisible = (index: number, value: boolean) => {
    if (index === 1) {
      setDeployVisible(value);
    }
  }

  const handleConsoleVisible = (index: number, value: boolean) => {
    if (index === 1) {
      setConsoleVisible(value);
    }
  }

  return (
    <div className="rounded-[12px] bg-primary-700 overflow-auto" style={{height}}>
      <Allotment
        snap
        onVisibleChange={handleDeployContainerVisible}
      >
        <Allotment.Pane
          minSize={200}
          snap={false}
        >
          <div className="w-full h-full border-none border-l border-solid border-primary-500">
            <Allotment
              snap
              vertical
              onVisibleChange={handleConsoleVisible}
            >
              <Allotment.Pane minSize={100}>
                <FileNavBar/>
                <MonacoEditor modelInfos={modelInfos}/>
              </Allotment.Pane>
              <Allotment.Pane
                minSize={console.minHeight || 78}
                preferredSize={console.defaultHeight || "30%"}
                visible={consoleVisible}
              >
                <Console/>
              </Allotment.Pane>
            </Allotment>
          </div>
        </Allotment.Pane>
        <Allotment.Pane
          maxSize={deploy.maxWidth || 240}
          minSize={deploy.minWidth || 140}
          preferredSize={deploy.defaultWidth || "200px"}
          visible={deployVisible}
        >
          <DeployAndCall/>
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}

export default function Editor(props: TEditorProps) {
  return (
    <EditorProvider id={props.id}>
      <RelayNetworkProvider>
        <ConsoleProvider>
          <DeployedProvider>
            <CssWrapper>
              <Main {...props} />
            </CssWrapper>
          </DeployedProvider>
        </ConsoleProvider>
      </RelayNetworkProvider>
    </EditorProvider>
  );
}
