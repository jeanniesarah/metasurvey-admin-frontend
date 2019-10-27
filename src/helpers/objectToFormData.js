function objectToFormData(dataObject) {
  // Django expects form data type, but ant.design forms product js objects.
  // Possible bottleneck: no encoding (e.g. ' ' -> %20). Dunno if it breaks stuff.
  let formData = new FormData();

  for (let key in dataObject) {
    if (dataObject[key] !== undefined && dataObject[key] !== null) {
      formData.append(key, dataObject[key]);
    }
  }

  return formData;
}

export default objectToFormData;
