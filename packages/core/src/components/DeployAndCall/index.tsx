import {Allotment} from "allotment";

import NavBar from "../NavBar";

import Deploy from "./Deploy";
import Call from "./Call";

const PlaceholderElement = () => {
  return (
    <div className="truncate h-full inline-flex items-center pl-2 text-[14px] font-medium text-primary-100">
      Deploy & Run Contract
    </div>
  )
}

const DeployAndCall = () => {

  return (
    <div className="w-full h-full flex flex-col bg-primary-700 pt-2">
      <NavBar placeholderElement={<PlaceholderElement />} />
      <div className="px-2 py-2 flex-auto box-border">
        <Allotment vertical>
          <Allotment.Pane maxSize={280} preferredSize="100%">
            <Deploy />
          </Allotment.Pane>
          <Allotment.Pane>
            <Call />
          </Allotment.Pane>
        </Allotment>
        {/*<label className="inline-flex text-primary-100 text-[14px] mb-1">测试1：</label>*/}
        {/*<Input />*/}
        {/*<label className="inline-flex text-primary-100 text-[14px] mb-1 mt-2">测试2：</label>*/}
        {/*<Select options={[{label: 'test', value: "test"}]} value="test" />*/}
        {/*<div className="mt-2" />*/}
        {/*<Button type="primary">测试</Button>*/}
      </div>
    </div>
  )
}

export default DeployAndCall;
