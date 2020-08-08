module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) { // async é necessária pra poder usar AWAIT dentro de uma função
    // inserir dados na tabela de proffys
    // o AWAIT nao precisa do THEN pq ele espera tudo acontecer pra ir pra próxima linha
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES(
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );  
    `)

    const proffy_id = insertedProffy.lastID

    // Inserir dados na tabela de classes
    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}" 
            );
    `)

    const class_id = insertedClass.lastID

    // Inserir dados na tabela de Schedule
    const insertedAllClassesSchedulesValue = classScheduleValues.map((classScheduleValue) => {
        //função MAP vai fazer um loop e para cada item do loop, retorna um valor que é armazenado no vetor insertedAllClassesSchedulesValue
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    // aqui executa todos os db.runs que foram armazenados na insertedAllClassesSchedulesValue
    await Promise.all(insertedAllClassesSchedulesValue) // aguarda todas as funções de banco de dados e guarda o valor dos retornos, e guarda num vetor
}