export function Output({ output }: any) {
  return (
    <div style={{ minHeight: "20vh" }}>
      OUTPUT:
      <br></br>
      {output.run.output}
      {/* {selectedLanguage} */}
    </div>
  );
}
