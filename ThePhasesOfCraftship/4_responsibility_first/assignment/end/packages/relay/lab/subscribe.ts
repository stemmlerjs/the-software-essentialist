import { DomainEvent } from "@dddforum/shared/src/core/domainEvent";
import { NatsEventBus } from "@dddforum/shared/src/events/bus/adapters/natsEventBus";

const natsEventBus = new NatsEventBus();

natsEventBus.initialize().then(() => {
  console.log('connectd');
  natsEventBus.subscribe('TestEvent', (event: DomainEvent) => {
    console.log('test event!!!!', event)
  })
  
  natsEventBus.subscribe('AnotherTestEvent', (event: DomainEvent) => {
    console.log('another test event!!!!', event)
  });
})
.catch((err) => {
  console.error(err)
})


// rabbitMQ.listen();
