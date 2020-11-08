function wait(fn: () => boolean, timeout: number = 400, endTime: number = 40000) {
  return new Promise((resolve, reject) => {
    let times = 0
    const timer = setInterval(async () => {
      if (times * timeout > endTime) {
        alert('time out!')
        timer && clearInterval(timer)
        return reject()
      }

      if (await fn()) {
        timer && clearInterval(timer)
        return resolve()
      }

      times += 1
    }, timeout)
  })
}

export { wait }
