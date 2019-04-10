import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class WorkCardDetail extends React.Component {

    render() {

        const { isOpen, toggle, work } = this.props;
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
                {work.title}
              </ModalHeader>
              <ModalBody>
                <p><strong>Description:</strong> {work.description}</p>
                <p><strong>Company:</strong> {work.company}</p>
                <p><strong>Position:</strong> {work.position}</p>
                <p><strong>Location:</strong> {work.location}</p>
                <p><strong>Start Date:</strong> {new Date(work.startDate).toLocaleDateString('en-US', options)}</p>
                <p><strong>End Date:</strong> {work.endDate ? new Date(work.endDate).toLocaleDateString('en-US', options) : 'Still Working Here'}</p>
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

export default WorkCardDetail;