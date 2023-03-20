import styled from 'styled-components';

const FormStyled = styled.form`
@import url('https://fonts.googleapis.com/css2?family=Roboto+Serif:wght@100&display=swap');

  display: flex;
  flex-direction: row;
  justify-content: center;
  input {
    border: 1px solid #001813;
    border-radius: 5px;
    font-family: 'Roboto Serif', serif;
    font-size: 20px;
    height: 50px;
    width: 325px;
  }
`;

const ButtonStyled = styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Nerko+One&display=swap');
  font-family: 'Nerko One', cursive;
  background-color: black;
  border: none;
  border-radius: 2px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: yellow;
  cursor: pointer;
  padding: 6px 20px;
  font-size: 18px;
  margin-top: ${(props) => (props.margin ? props.margin : 'auto')};
  margin-bottom: ${(props) => (props.margin ? props.margin : 'auto')};
`;

const FilterAndOrderStyle = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: baseline;
  width: 100vw;
  margin-top: 10px;
  select, input {
    padding: 6px 20px;
    font-size: 18px;
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const MainSectionStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const DivTableStyle = styled.div`
  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  overflow: scroll;
  td, th { 
    border-bottom:1px #dddddd solid;
    text-align: left;
    padding: 8px;
  }
  th { background-color: #999; }
  
  .striped:nth-child(even){
    background-color: #dddddd;
  }

  .hover:hover{
    background-color: #61dafb;
  }
`;

export {
  FormStyled, ButtonStyled, FilterAndOrderStyle, MainSectionStyle, DivTableStyle,
};
