export class uuid {
  constructor(private usedIds: Number[]) {}

  generateId(): number {
    const randomNumber = (max: number): number => Math.random() * max;

    const checkId = (id: number): number =>
      this.usedIds.includes(id) ? checkId(randomNumber(999999)) : id;

    const id = randomNumber(999999);

    let checkedId = checkId(id);

    this.usedIds.push(checkedId);

    return checkedId;
  }

  removeId(id: number): void {
    const index = this.usedIds.indexOf(id);
    if (index > -1) this.usedIds.splice(index, 1);
  }
}
