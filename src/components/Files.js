import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import ModalImage from 'react-modal-image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/*
 * Code adapted from Ben Awad
 * (Source: https://github.com/benawad/apollo-server-react-file-upload/blob/1_gc/web/src/Files.js retrieved in February 2019)
*/



export const filesQuery = gql`
  {
    files
  }
`;

export const Files = () => {
  const { data, loading } = useQuery(filesQuery);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.files.map(x => (
          <Row>
            <Col lg={3}>
              <ModalImage
                style={{ width: 200}}
                small={`https://storage.cloud.google.com/cg4001-ethereum-healthcare-records/${x}`}
                large={`https://storage.cloud.google.com/cg4001-ethereum-healthcare-records/${x}`}
                alt={x}
              />
              <p>&nbsp;</p>
            </Col>
        </Row>
      ))}
    </div>
  );
};