function setInputStatus(errorCondition = false) {
  // can return only one of: ["success", "warning", "error", "validating", ""];
  // see unicornplatform/frontend/node_modules/antd/lib/form/FormItem.d.ts
  if (errorCondition === true) {
    return 'error';
  } else {
    return '';
  }
}

export default setInputStatus;
