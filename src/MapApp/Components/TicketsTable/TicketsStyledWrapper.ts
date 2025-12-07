import styled from "styled-components";

const TicketsMobileWrapper = styled.div`
  height: 100px;
  width: 100%;
  .ant-table-content > table > tbody > tr.active > td,
  .ant-table-content > table > tbody > tr.active:hover > td {
    background-color: #e7e7e7;
  }
`;

export default TicketsMobileWrapper;
