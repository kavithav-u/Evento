import React from 'react'

const Features = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h6 className="text-5xl text-primary mb-4">01.</h6>
            <h4 className="text-xl font-semibold mb-4">Initial Inquiry</h4>
            <p className="text-gray-600">Feugiat netus vitae dui, mi sed amet eu sem pharetra senectus id blandit dictum urna est morbi tempus, auctor sed egestas condimentum neque donec.</p>
          </div>
          <div className="text-center">
            <h6 className="text-5xl text-primary mb-4">02.</h6>
            <h4 className="text-xl font-semibold mb-4">Event Planning</h4>
            <p className="text-gray-600">Mollis duis sit rhoncus euismod bibendum quam ullamcorper tristique malesuada a curabitur, vulputate eros amet cursus semper est fusce est amet.</p>
          </div>
          <div className="text-center">
            <h6 className="text-5xl text-primary mb-4">03.</h6>
            <h4 className="text-xl font-semibold mb-4">Execution</h4>
            <p className="text-gray-600">Scelerisque cras curae, ut ante elit urna senectus condimentum dictumst orci mi eu scelerisque dolor libero justo inceptos.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features