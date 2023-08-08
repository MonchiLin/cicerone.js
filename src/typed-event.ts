export interface EventCallback {
  name: string,
  callbacks: Function[],
}
export type Callback<T> = (payload: T) => void;

export class TypedEvent<EventNames extends string> {
  private listeners: Record<EventNames, EventCallback>;

  constructor() {
    this.listeners = {} as Record<EventNames, EventCallback>;
  }

  on<T = any>(eventName: EventNames, callback: Callback<T>) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = {
        name: eventName,
        callbacks: [callback],
      };
    } else {
      this.listeners[eventName].callbacks.push(callback);
    }

    return () => {
      const callbackIndex = this.listeners[eventName].callbacks.indexOf(callback);
      if (callbackIndex > -1) this.listeners[eventName].callbacks.splice(callbackIndex, 1);
    }
  }

  off(eventName: EventNames, callback: Callback<any>) {
    if (!this.listeners[eventName]) return;
    const callbackIndex = this.listeners[eventName].callbacks.indexOf(callback);
    if (callbackIndex > -1) this.listeners[eventName].callbacks.splice(callbackIndex, 1);
  }

  destroy() {
    this.listeners = {} as Record<EventNames, EventCallback>;
  }

  emit(eventName: EventNames, payload?: any) {
    if (!this.listeners[eventName]) return;
    this.listeners[eventName].callbacks.forEach(callback => {
      callback(payload);
    });
  }

}
