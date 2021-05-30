const Scroll = (props) => {
  return (
    <div style={{ overflowY: "scroll", overflowX: "hidden", height: "90vh" }}>
      {props.children}
    </div>
  );
};

export default Scroll;
