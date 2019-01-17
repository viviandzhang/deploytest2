function submitDilemmaHandler() {
    const data = {
      title: "Should I do X thing?",
      body: "Hello world, this is a fake new dilemma"
    }
    post('/api/dilemma', data);
    console.log('this is working')
  }