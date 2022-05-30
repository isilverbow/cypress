export function tableData(dataTable) {
  let content = {};

  dataTable.rawTable.reduce((rowA, rowB) =>
    rowA.forEach(function (header, index) {
      content[header] = rowB[index];
    })
  );

  return content;
}
