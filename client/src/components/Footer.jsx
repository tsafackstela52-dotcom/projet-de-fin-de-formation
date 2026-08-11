function Footer({ description, onDescriptionChange, onSubmit, loading, disabled }) {
  return (
    <footer className="app-footer">
      <form onSubmit={onSubmit} className="input-bar">
        <input
          type="text"
          className="input-field"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder={disabled ? "Analyse en cours..." : "Décrivez vos symptômes..."}
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={loading || !description.trim() || disabled}
          className="btn-submit"
        >
          {loading ? "..." : "Analyser"}
        </button>
      </form>
    </footer>
  );
}

export default Footer;