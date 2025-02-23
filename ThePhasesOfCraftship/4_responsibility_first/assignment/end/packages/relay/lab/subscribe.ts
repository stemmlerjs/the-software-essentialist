import { RabbitMQMessageBus } from "@dddforum/shared/src/events/bus/adapters/rabbitMqEventPublisher";

const rabbitMQ = new RabbitMQMessageBus({
  connectionString: 'amqp://user:password@127.0.0.1:5672',
  exchange: 'domain-events'
});

rabbitMQ.connect().then(() => {
  rabbitMQ.subscribe('TestEvent', (message: string) => {
    console.log('test event!!!!', message)
  });
  
  rabbitMQ.subscribe('AnotherTestEvent', (message: string) => {
    console.log('another test event!!!!', message)
  });
  
  console.log(rabbitMQ.getSubscribers('TestEvent'));
})



// rabbitMQ.listen();
