const Attribution = () => (
  <>
    <p className="attribution">
      source:{" "}
      <a href="https://github.com/nytimes/covid-19-data" target="_blank">
        https://github.com/nytimes/covid-19-data
      </a>
    </p>
    <style jsx>{`
      .chart {
        padding-bottom: 5rem;
      }
      .attribution {
        text-align: center;
        color: "#67568c";
        font-weight: bold;
        font-family: Arial;
        margin-bottom: 10rem;
      }
      .attribution a {
        color: "#ff6e6c";
      }
    `}</style>
  </>
);

export default Attribution;
