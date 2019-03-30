import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class PortfolioCardDetail extends React.Component {

    render() {

        const { isOpen, toggle, portfolio } = this.props;
        const options = {
          year: "numeric",
          month: "long"
        };
        return (
          <div>
            <Modal
              isOpen={isOpen}
              toggle={toggle}
            >
              <ModalHeader toggle={toggle}>
                {portfolio.title}
              </ModalHeader>
              <ModalBody>
                <p><strong>Description:</strong> {portfolio.description}</p>
                <p><strong>Company:</strong> {portfolio.company}</p>
                <p><strong>Position:</strong> {portfolio.position}</p>
                <p><strong>Location:</strong> {portfolio.location}</p>
                <p><strong>Start Date:</strong> {new Date(portfolio.startDate).toLocaleDateString('en-US', options)}</p>
                <p><strong>End Date:</strong> {portfolio.endDate ? new Date(portfolio.endDate).toLocaleDateString('en-US', options) : 'Still Working Here'}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        );
    }
}

export default PortfolioCardDetail;