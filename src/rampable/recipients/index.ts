import { XellarEWBase } from '../../base';
import { Container } from '../../container';
import { XellarEWRampableCreateRecipient } from './create-recipient';
import { XellarEWRampableDeleteRecipient } from './delete-recipient';
import { XellarEWRampableListRecipients } from './list-recipients';
import { XellarEWRampableUpdateRecipient } from './update-recipient';

export class XellarEWRampableRecipients extends XellarEWBase {
  protected rampableListRecipient: XellarEWRampableListRecipients;

  protected rampableCreateRecipient: XellarEWRampableCreateRecipient;

  protected rampableUpdateRecipient: XellarEWRampableUpdateRecipient;

  protected rampableDeleteRecipient: XellarEWRampableDeleteRecipient;

  constructor(container: Container) {
    super(container);

    this.rampableListRecipient = new XellarEWRampableListRecipients(container);
    this.rampableCreateRecipient = new XellarEWRampableCreateRecipient(
      container,
    );
    this.rampableUpdateRecipient = new XellarEWRampableUpdateRecipient(
      container,
    );
    this.rampableDeleteRecipient = new XellarEWRampableDeleteRecipient(
      container,
    );
  }

  get listRecipients() {
    return this.rampableListRecipient.listRecipients.bind(this);
  }

  get createRecipient() {
    return this.rampableCreateRecipient.createRecipient.bind(this);
  }

  get updateRecipient() {
    return this.rampableUpdateRecipient.updateRecipient.bind(this);
  }

  get deleteRecipient() {
    return this.rampableDeleteRecipient.deleteRecipient.bind(this);
  }
}
