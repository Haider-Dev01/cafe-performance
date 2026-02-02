import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    nb_clients: 15,
    est_weekend: false,
    saison: 'été',
    pic_journee: false
  })
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)

  const handlePredict = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      setPrediction(data)
    } catch (error) {
      console.error('Erreur API:', error)
      alert('Erreur: Assurez-vous que le backend FastAPI est lancé sur le port 8000')
    }
    setLoading(false)
  }

  const styles = {
    container: {
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center'
    },
    header: { color: '#2c3e50', marginBottom: '20px' },
    formGroup: { marginBottom: '15px', textAlign: 'left' },
    label: { display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: '600' },
    input: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' },
    select: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' },
    checkbox: { marginRight: '10px' },
    button: {
      backgroundColor: '#27ae60',
      color: 'white',
      padding: '12px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      width: '100%',
      fontSize: '16px',
      fontWeight: 'bold',
      marginTop: '10px',
      transition: '0.3s'
    },
    result: {
      marginTop: '25px',
      padding: '20px',
      backgroundColor: '#f1fcf4',
      borderRadius: '8px',
      border: '1px solid #d4edda'
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>☕ Prédicteur Performance Café</h2>
      <form onSubmit={handlePredict}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre de Clients Prévus</label>
          <input 
            type="number" 
            style={styles.input}
            value={formData.nb_clients}
            onChange={(e) => setFormData({...formData, nb_clients: parseInt(e.target.value)})}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Saison</label>
          <select 
            style={styles.select}
            value={formData.saison}
            onChange={(e) => setFormData({...formData, saison: e.target.value})}
          >
            <option value="été">Été</option>
            <option value="hiver">Hiver</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            <input 
              type="checkbox" 
              style={styles.checkbox}
              checked={formData.est_weekend}
              onChange={(e) => setFormData({...formData, est_weekend: e.target.checked})}
            />
            Week-end
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            <input 
              type="checkbox" 
              style={styles.checkbox}
              checked={formData.pic_journee}
              onChange={(e) => setFormData({...formData, pic_journee: e.target.checked})}
            />
            Pic de journée
          </label>
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Analyse...' : 'Prédire les Ventes'}
        </button>
      </form>

      {prediction && !prediction.error && (
        <div style={styles.result}>
          <h3 style={{margin: 0, color: '#27ae60'}}>Estimation :</h3>
          <p style={{fontSize: '24px', fontWeight: 'bold', margin: '10px 0'}}>
            {prediction.prediction_ventes} {prediction.devise}
          </p>
        </div>
      )}
    </div>
  )
}

export default App
